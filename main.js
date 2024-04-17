// main.js
// Capstone 2: Express
"use strict";

// 앱 설정
const 
    express = require("express"),
    homeController = require('./controllers/homeController'),
    errorController = require('./controllers/errorController'),

    app = express();
    
app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
    res.send("Welcome to Confetti cuisine!");
});

/**
 * Listing 12.7 (p. 179)
 * ejs 레이아웃 렌더링
 */

const layouts = require("express-ejs-layouts");

app.set("view engine", "ejs");
app.use(layouts);

app.use(express.static("public"));

/**
 * Listing 12.4 (p. 177)
 * body-parser의 추가
 */
app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(express.json());

/**
 * Listing 12.6 (p. 178)
 * 각 페이지 및 요청 타입을 위한 라우트 추가
 */

app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);

/**
 * Listing 12.12 (p. 184)
 * 에러 처리 라우트 
 */
app.use(errorController.pageNotFoundError);
app.use(errorController.InternalServerError);


// 3000번 포트로 리스닝 설정
app.listen(app.get("port"), () => {
    console.log(`Sever running at http://localhost:${app.get("port")}`);
        
});