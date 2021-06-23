const { find, create} = require("./mongoService");
const justry = require("express")();
const bodyParser = require('body-parser');
var cors = require('cors');
const jsonParser = bodyParser.json()

justry.use(cors());
justry.set('Content-Type', 'text/plain');

const onSucces = (svResponse, dbResponse) => {
    svResponse.status(200)
    svResponse.json(dbResponse);
};

const ondbError = (svResponse, error) => {
    svResponse.status(400)
    svResponse.json(error);
};

justry.post("/login", jsonParser , (req, res) => 
    find("userlogin", "username" , req.body.username).then(
        user => {
            if (user && req.body.password === user.password) onSucces(res, {
                response: "Login successfully",
                data: { 
                    id: user.id,
                }
            });
            else ondbError(res, { 
                response: "Login error",
            })
        },
        err => ondbError(res, { 
            response: err,
        })
    )
);

justry.post("/register", jsonParser , (req, res) => 
    find("userlogin", "username" , req.body.username).then(
        user => {
            if (user) ondbError(res, "Ya existe el usuario especificado" )
            else create("userlogin", {
                    username: req.body.username,
                    password: req.body.password
                }).then(
                    newUser => onSucces(res, "Usuario creado exitosamnete"),
                    err => ondbError(res, err)
                )
        },
        err => ondbError(res, err)
    )
);

justry.get("/user/:id", (req, res) => 
    find("users", "id", req.params.id).then(
        user => onSucces(res, user),
        err => ondbError(res, err)
    )
);

justry.post("/newuser", jsonParser, (req, res) => {
    create("users", req.body).then(
        newUser => onSucces(res, {response: "User created successfully"}),
        err => ondbError(res, err)
    )
});


justry.listen(process.env.PORT || 5000);

