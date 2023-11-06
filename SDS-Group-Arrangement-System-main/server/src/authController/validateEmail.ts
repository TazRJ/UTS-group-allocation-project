export default function checkEmailType(email: string) {
  if (/@uts\.edu\.au$/.test(email)) {
    return 'T'
  }

  if (/@student\.uts\.edu\.au$/.test(email)) {
    return 'S'
  }

  return 'Not valid'
}
