import {isValidObjectId} from "mongoose"
import { badRequest } from "./handleResponse"

const parseMongoId = (id: string): boolean => {
    if(!isValidObjectId(id)){
        return false
    }
    return true;
}

export default parseMongoId