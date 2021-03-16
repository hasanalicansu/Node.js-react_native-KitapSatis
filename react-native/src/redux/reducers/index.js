import {combineReducers} from "redux";
import getMainReducer from "./GetMainReducer"
import getProductDataReducer from "./GetProductDataReducer"
import visitorProfileReducer from "./VisitorProfileReducer"
import getMineProductReducer from "./GetMineProductReducer"
import favoriteReducer from "./FavoriteReducer"
import productUpdateReducer from "./ProductUpdateReducer"
import searchReducer from "./SearchReducer"
import getImageReducer from "./GetImageReducer" 
import registerReducer from "./RegisterReducer" 
import loginReducer from "./LoginReducer" 
import logoutReducer from "./LogoutReducer" 
import tokenLoginReducer from "./TokenLoginReducer" 
import chatReducer from "./ChatReducer" 
import newProductAvailableReducer from "./NewProductAvailableReducer" 
import avatarReducer from "./AvatarReducer" 
import forgetPasswordReducer from "./ForgetPasswordReducer"
import getMineSoldProductReducer from "./GetMineSoldProductReducer"


export default combineReducers({
   getMainResponse : getMainReducer,
   getProductDataResponse:getProductDataReducer,
   visitorProfileResponse:visitorProfileReducer,
   getMineProductResponse:getMineProductReducer,
   favoriteResponse:favoriteReducer,
   productUpdateResponse:productUpdateReducer,
   searchResponse:searchReducer,
   getImageResponse:getImageReducer,
   registerResponse:registerReducer,
   loginResponse:loginReducer,
   tokenLoginResponse:tokenLoginReducer,
   chatResponse:chatReducer,
   newProductAvailableResponse:newProductAvailableReducer,
   logoutResponse:logoutReducer,
   avatarResponse:avatarReducer,
   forgetPasswordResponse:forgetPasswordReducer,
   getMineSoldProductResponse:getMineSoldProductReducer
});