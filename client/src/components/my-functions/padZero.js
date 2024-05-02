export default async (num, places) =>{
    return String(num).padStart(places, "0")
}