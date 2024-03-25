# Environment Variables in Our Moka Workspace 🎯

- **What they are:** Changeable settings that adapt your code to different environments (development, staging, production) ⚙️.
- **Why centralize?**
  - **Easier Management:** One place to update settings that might be shared across apps or packages.
  - **Consistency:** Helps ensure everyone is using the same base configurations.

## Your Centralized Structure

We're keeping all our `.env` files in a single `envs/` folder:

<pre id="tree-panel"><bold><span class="t-icon" name="icons">📦</span>envs</bold><br/> ┣ <span class="t-icon" name="icons">📜</span>.env.defaults<br/> ┣ <span class="t-icon" name="icons">📜</span>.env.development<br/> ┣ <span class="t-icon" name="icons">📜</span>.env.production<br/> ┗ <span class="t-icon" name="icons">📜</span>.env.staging</pre>

## How It Works

1. **Base Settings:** Your `.env.defaults` file sets the foundation.
2. **Environment Overrides:** Files like `.env.development` provide specific changes for each environment.
3. **Loading Them In:** Tools like `dotenv` automatically load the correct `.env` file based on your environment settings.

## Typical Variables

- **API_BASE_URL:** Point to your development, staging, or production APIs 🌍.
- **FEATURE_X_ENABLED:** Toggle features on/off for testing 🚀.
- **LOG_LEVEL:** Control how much detail is logged (more for debugging, less for production) 🔎.
