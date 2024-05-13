const express = require('express');

const zod  = require('zod');
const schema =  zod.object({
    username: zod.string().min(3).max(20),
    password:  zod.string().min(8, "Password must be at least 8 characters long")
    .max(15, "Password cannot be more than 15 characters long").regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    ),
    kindneyId: zod.number()
})

const app = express();

app.use(express.json());


function userVaildation(req, res,next) {
    const username = req.body.username;
    const password =  req.body.password;
    const validationResult = schema.safeParse(req.body);
    if (!validationResult.success) {
        res.status(403).json({ message: "Invalid username or password", errors: validationResult.error });
    } else {
        next();
    }
    
}


    function kindneyVaild(req, res, next) {
        const kindneyId = req.body.kindneyId;
        if (kindneyId != 1 && kindneyId != 2) {
            res.status(403).json({ message: "kindney is not good" });
        } else {
            next();
        }
    }

    
    app.post('/login', userVaildation, kindneyVaild, (req, res) => {
        res.json({ message: "User authenticated successfully" });
    });
    


app.listen(3000, () => {
    console.log("server is running on port 3000");
});