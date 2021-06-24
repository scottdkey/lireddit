import Cors from "cors"

export const cors = Cors({
  origin: "http://localhost:3000",
  credentials: true,
})