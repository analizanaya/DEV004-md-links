const fs = require('fs');
import { readFileApi } from './api';



readFileApi()
    .then((respuesta) => {
        console.log(respuesta);
    })
    .catch((error) => {
        console.log(error);
    })