import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../model/user/userModel'
import validateEmail from './validateEmail'
import Token from '../model/token/tokenModel'
import crypto from 'crypto'
import sendEmail from '../utils/sendEmail'

const login = async (req: any, res: any, next: any) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res
        .status(401)
        .json({ status: 'error', message: 'Username or password incorrect!' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    const exp = Math.floor(Date.now() / 1000) + 60
    if (isPasswordValid) {
      const token = jwt.sign(
        {
          email: user.email,
          UTS_Id: user.UTS_ID,
          name: user.name,
          role: user.role,
        },
        'secret123',
        {
          expiresIn: '1h',
        },
      )

      res.status(200).json({
        status: 'ok',
        user: token,
      })
    } else {
      res
        .status(401)
        .json({ status: 'error', message: 'Username or password incorrect!' })
    }
  } catch (error) {
    res.status(500).json({ status: 'error', message: (error as Error).message })
  }
}

const register = async (req: any, res: any, next: any) => {
  try {
    const { name, email, id, password } = req.body

    const utsIdPattern = /^\d{8}$/

    if (!utsIdPattern.test(req.body.id)) {
      return res.status(400).json({ message: 'UTS_ID must be 8 digits.' })
    }

    const existingUserWithEmail = await User.findOne({ email })
    if (existingUserWithEmail) {
      return res.status(400).json({ message: 'Email address already in use.' })
    }

    const existingUserWithUTSID = await User.findOne({ UTS_ID: id })
    if (existingUserWithUTSID) {
      return res.status(400).json({ message: 'UTS_ID already in use.' })
    }

    let role = ''
    const emailType = validateEmail(email)

    if (emailType === 'T') {
      role = 'T'
    } else if (emailType === 'S') {
      role = 'S'
    } else {
      throw new Error('Not a valid email type, Check if email is UTS email')
    }

    const hashedPass = await bcrypt.hash(password, 10)

    const user = new User({
      name: name,
      role: role,
      email: email,
      UTS_ID: id,
      password: hashedPass,
    })

    await user.save()

    const token = jwt.sign({ name, email, role, id }, 'secret123', {
      expiresIn: '1h',
    })

    res.status(201).json({
      message: 'User created successfully',
      user: token,
    })
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}

const forgotPassword = async (req: any, res: any, next: any) => {
  try {
    const { email } = req.body

    const emailType = validateEmail(email)

    if (emailType !== 'T' && emailType !== 'S') {
      throw new Error('Not a valid email type, Check if email is UTS email')
    }

    let user = await User.findOne({ email })

    if (!user)
      return res
        .status(409)
        .send({ message: 'User with given email does not exist!' })

    let token = await Token.findOne({ userId: user._id })
    if (!token) {
      const newToken = new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString('hex'),
      })

      token = await newToken.save()
    }
    const url = `http://localhost:3000/password-reset/${user._id}/${token.token}`
    await sendEmail(user.email, 'Password Reset', url)

    res
      .status(200)
      .send({ message: 'Password reset link sent to your email account' })
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' })
  }
}

const checkToken = async (req: any, res: any, next: any) => {
  try {
    const {id} = req.params;

		const user = await User.findOne({ _id: id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		res.status(200).send({message: "Valid Url"});
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
}

const resetPassword = async (req: any, res: any, next: any) => {
  try {

		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});

		if (!token) return res.status(400).send({ message: "Invalid link" });


		const hashPassword = await bcrypt.hash(req.body.password, 10);

		user.password = hashPassword;
		await user.save();
		await token.deleteOne();

		res.status(200).send({ message: "Password reset successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
}

export default { register, login, forgotPassword, checkToken, resetPassword }
