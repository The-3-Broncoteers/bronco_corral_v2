"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.userRouter = void 0;
var express_1 = __importDefault(require("express"));
var user_controller_1 = require("../controllers/user.controller");
var router = express_1["default"].Router();
exports.userRouter = router;
router.get('/:id', user_controller_1.getUserByID);
router.put('/create', user_controller_1.createNewUser);
router["delete"]('/:id', user_controller_1.deleteUserByID);
//# sourceMappingURL=user.routes.js.map