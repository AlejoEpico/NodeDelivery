import { DoorDashClient } from "@doordash/sdk";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config";

const client = new DoorDashClient({
  developer_id: process.env.DEVELOPER_ID,
  key_id: process.env.KEY_ID,
  signing_secret: process.env.SIGNING_SECRET,
});

const response = client
  .getDelivery("52ac06ee-687b-4c32-a614-3ea917f3e03f")
  .then((response) => {
    console.log(response.data);
  })
  .catch((err) => {
    console.log(err);
  });

console.log(response);
