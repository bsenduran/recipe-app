Add the following lines to `ES_HOME`/repository/conf/security/sso-idp-config.xml

    <ServiceProvider>
            <Issuer>recipe-app</Issuer>
            <AssertionConsumerService>https://localhost:9443/recipe-app/acs</AssertionConsumerService>
            <SignResponse>true</SignResponse>
            <CustomLoginPage>/recipe-app/controllers/login.jag</CustomLoginPage>
        </ServiceProvider>
    </ServiceProviders>


How to run
----------
Clone the project into `ES_HOME`/repository/deployment/server/jaggeryapps/



