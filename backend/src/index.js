import { app } from "./app.js";
import connectDB from "./db/index.js";

const startServer = async () => {
    try {
        await connectDB();
        const port = process.env.PORT || 8000;
        
        app.listen(port, () => {
            console.log(`Server is running at port: ${port}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
    }
};

startServer();

