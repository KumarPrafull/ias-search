export const createSlug = ({name, batch, rank, service, _id}:{name: string, batch: string, rank: string, service: string, _id: string}): string => {
  return `${name.trim().toLowerCase().replace(/\s+/g, '-')}-${service.toLowerCase()}-${batch}-rank-${rank}-${_id}`
}