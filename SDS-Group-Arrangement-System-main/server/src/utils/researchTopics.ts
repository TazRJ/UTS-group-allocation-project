const researchTopics = [
  'The Impact of Artificial Intelligence on Healthcare',
  'Climate Change Mitigation Strategies in Urban Planning',
  'The Psychology of Decision-Making in High-Stakes Situations',
  'The Role of Social Media in Political Movements',
  'Nanotechnology Applications in Medicine',
  'Cybersecurity Threats and Countermeasures in the Digital Age',
  'Sustainable Agriculture Practices for Food Security',
  'Mental Health Challenges in Post-Pandemic Society',
  'Artificial Intelligence in Education',
  'Cultural Impact of Streaming Services on Entertainment',
]

export default function getRandomResearchTopic() {
  const randomIndex = Math.floor(Math.random() * researchTopics.length)

  return researchTopics[randomIndex]
}


