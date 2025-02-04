/**
 * Copyright 2022 Inrupt Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
 * Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

export interface TestingEnvironment {
  clientId: string;
  clientSecret: string;
  environment: "Inrupt Dev-Next" | "Inrupt Production" | "Inrupt 1.1" | "NSS";
  feature: {
    acp: boolean;
    acp_v3: boolean;
    wac: boolean;
  };
  idp: string;
  pod: string;
}

export function getTestingEnvironment(): TestingEnvironment {
  if (
    process.env.E2E_TEST_ENVIRONMENT !== "Inrupt Dev-Next" &&
    process.env.E2E_TEST_ENVIRONMENT !== "Inrupt Production" &&
    process.env.E2E_TEST_ENVIRONMENT !== "Inrupt 1.1" &&
    process.env.E2E_TEST_ENVIRONMENT !== "NSS"
  ) {
    throw new Error(`Unknown environment: ${process.env.E2E_TEST_ENVIRONMENT}`);
  }
  if (
    !process.env.E2E_TEST_POD ||
    !process.env.E2E_TEST_IDP ||
    !process.env.E2E_TEST_CLIENT_ID ||
    !process.env.E2E_TEST_CLIENT_SECRET
  ) {
    const missing = (!process.env.E2E_TEST_POD ? "E2E_TEST_POD " : "")
      .concat(!process.env.E2E_TEST_IDP ? "E2E_TEST_IDP " : "")
      .concat(!process.env.E2E_TEST_CLIENT_ID ? "E2E_TEST_CLIENT_ID " : "")
      .concat(
        !process.env.E2E_TEST_CLIENT_SECRET ? "E2E_TEST_CLIENT_SECRET " : ""
      );
    throw new Error(`Environment variable missing: ${missing}`);
  }
  return {
    pod: process.env.E2E_TEST_POD,
    idp: process.env.E2E_TEST_IDP,
    clientId: process.env.E2E_TEST_CLIENT_ID,
    clientSecret: process.env.E2E_TEST_CLIENT_SECRET,
    environment: process.env.E2E_TEST_ENVIRONMENT,
    feature: {
      acp: process.env.E2E_TEST_FEATURE_ACP === "true" ? true : false,
      acp_v3: process.env.E2E_TEST_FEATURE_ACP_V3 === "true" ? true : false,
      wac: process.env.E2E_TEST_FEATURE_WAC === "true" ? true : false,
    },
  };
}
