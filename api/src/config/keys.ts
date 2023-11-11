import prodKeys from "./prod";
import devKeys from "./dev";

interface Keys {
  MONGO_URI: string;
  JWT_SECRET_KEY: string;
  NODE_ENV: string;
  AWS_S3_BUCKET_REGION: string;
  AWS_S3_BUCKET_NAME: string;
  AWS_S3_ACCESS_KEY: string;
  AWS_S3_SECRET_ACCESS_KEY: string;
}

let keys: Keys;

if (process.env.NODE_ENV === "production") {
  keys = prodKeys as Keys;
} else {
  keys = devKeys as Keys;
}
export default keys;
