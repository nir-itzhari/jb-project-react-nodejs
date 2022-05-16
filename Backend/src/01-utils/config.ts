class Config {

}

class DevelopmentConfig extends Config {
    public isDevelopment = true
    public mySql = { host: "localhost", user: "root", password: "", database: "VacationsDB" }

}

class ProductionConfig extends Config {
    public isDevelopment = false
    public mySql = { host: "eu-cdbr-west-02.cleardb.net", user: "b380a5493c2f40", password: "9a75b00d", database: "heroku_f71af5f35f0eb93" }
}

const config = process.env.NODE_ENV === "production" ? new ProductionConfig() : new DevelopmentConfig()


export default config


