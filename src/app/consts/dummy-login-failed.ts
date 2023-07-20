import { ResponseLogin } from "../models/response.model";

export const DummyLoginFailed: ResponseLogin = {
    status : {
        responseCode: 500,
        responseDesc: "User tidak memiliki akses"
    }
}