class Config {

}
class DevelopmentConfig extends Config {
    public isDevelopment = true;
    public followersUrl = "http://localhost:3003/api/followers/";
    public vacationsUrl = "http://localhost:3003/api/vacations/";
    public vacationsImageUrl = "http://localhost:3003/assets/images/";
    public registerUrl = "http://localhost:3003/api/auth/register/";
    public loginUrl = "http://localhost:3003/api/auth/login/";
    public contactUs = "http://localhost:3003/api/contact/email/";
    public socketUrl = "http://localhost:3003";
}

class ProductionConfig extends Config {
    public isDevelopment = false;
    public followersUrl = "https://travel-by-nir.herokuapp.com/api/followers/";
    public vacationsUrl = "https://travel-by-nir.herokuapp.com/api/vacations/";
    public vacationsImageUrl = "https://travel-by-nir.herokuapp.com/assets/images/";
    public registerUrl = "https://travel-by-nir.herokuapp.com/api/auth/register/";
    public loginUrl = "https://travel-by-nir.herokuapp.com/api/auth/login/";
    public contactUs = "https://travel-by-nir.herokuapp.com/api/contact/email/";
    public socketUrl = "https://travel-by-nir.herokuapp.com/";
}


const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();


export default config;