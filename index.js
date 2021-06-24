const { find, create} = require("./mongoService");
const justry = require("express")();
const bodyParser = require('body-parser');
var cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const jsonParser = bodyParser.json()

justry.use(cors());
justry.set('Content-Type', 'text/plain');

const onSucces = (svResponse, dbResponse, data) => {
    svResponse.status(200)
    svResponse.json({
        response: dbResponse,
        data: data,
    });
};

const ondbError = (svResponse, error) => {
    svResponse.status(400)
    svResponse.json({ 
        response: error,
    });
};

justry.post("/login", jsonParser , (req, res) => 
    find("users", "username" , req.body.username).then(
        user => {
            const data = user && { id: user.id }
            if (user && req.body.password === user.password) onSucces(res, "Login successfully", data);
            else ondbError(res, "Login error");
        },
        err => ondbError(res, err)
    )
);

justry.post("/register", jsonParser , (req, res) => 
    find("users", "username" , req.body.username).then(
        user => {
            const userToCreate = { 
                username: req.body.username,
                password: req.body.password,
                id: uuidv4(),
                info: {
                    totalMoney: 0,
                    cash: 0,
                    investments: 0,
                    dolars: 0,
                    bankAccount: 0,
                    expendedMoney: 0,
                    leisure: 0,
                    things: 0,
                    friends: 0,
                    fee: 0,
                }
             }
            if (user) ondbError(res, "Ya existe el usuario especificado")
            else create("users", userToCreate).then(
                    () => onSucces(res, "Usuario creado exitosamnete", null),
                    err => ondbError(res, err)
                )
        },
        err => ondbError(res, err)
    )
);

justry.get("/user/:id", (req, res) => 
    find("users", "id", req.params.id).then(
        user => {
            if (user) onSucces(res, "User founded", user)
            else ondbError(res, "user not founded")
        },
        err => ondbError(res, err)
    )
);



justry.listen(process.env.PORT || 3030);

