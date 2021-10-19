import {
  assertEquals,
  assertObjectMatch,
} from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { School } from "../../src/School.ts";

const env = config();
const schoolCode = env.SCHOOL_CODE;

Deno.test("Code", () => {
  const school = new School(schoolCode);
  assertEquals(school.code, schoolCode);
});

Deno.test("jsonrpc", async () => {
  const school = new School(schoolCode);
  await school.get()
    .then((data) => {
      const json = JSON.parse(JSON.stringify(data as string));
      assertEquals(json.jsonrpc, "2.0");
    })
    .catch((err) => console.log(err));
});
