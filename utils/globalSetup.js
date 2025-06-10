const dotenv = require('dotenv');

async function globalSetup() {
    try {
        if (process.env.ENV) {
            dotenv.config({
                path: `.env.${process.env.ENV}`,
                override: true,
            });
            console.log(`Loaded environment variables from .env.${process.env.ENV}`);
        } else {
            console.log("No specific ENV provided, using default environment variables.");
        }
    } catch (error) {
        console.error("Error in loading environment variables", error);
    }
}

module.exports = globalSetup;