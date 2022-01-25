export default function (): string {
  const minNumber = 11111111
  const maxNumber = 99999999

  const id = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber

  return String(id)
}
