import { http, HttpResponse } from "msw";
import { User } from "../src/models";
import { STATUS } from "../../../apps/playground/src/Profile";
import { nanoid } from "nanoid";

export const handlers = [
  http.get("api/getStatus", () => {
    return HttpResponse.json({
      isActive: STATUS.ACTIVE,
    });
  }),

  // Mocking the users endpoint with fetch
  http.get("api/users", async () => {
    // Generate multiple users (using a loop)
    const users = [] as User[];
    for (let i = 0; i < 10; i++) {
      users.push({
        // Assuming you don't need your 'db' object anymore
        id: nanoid(),
        name: `John Doe ${i}`,
        email: `jdoe${i}@td.local`,
      });
    }

    // Simulate a network response
    const response = new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-type": "application/json" },
    });

    return response;
  }),
];
