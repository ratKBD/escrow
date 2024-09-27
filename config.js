export default process.env.NODE_ENV != "production"
  ? {
      node_api_endpoint: "https://portalapi.eazypayouts.com/v1",
      firebaseConfig: {
        apiKey: "AIzaSyA1WDpZAq-p1yHtlCBUz48zd8XpqENr1eE",
        authDomain: "phedora-payouts.firebaseapp.com",
        projectId: "phedora-payouts",
        storageBucket: "phedora-payouts.appspot.com",
        messagingSenderId: "342415860715",
        appId: "1:342415860715:android:47ef8dbe89ac6acc512fae",
        measurementId: "G-87QEYBXN8Y",
      },
    }
  : {
      node_api_endpoint: "https://portalapi.eazypayouts.com/v1",
      firebaseConfig: {
        apiKey: "AIzaSyA1WDpZAq-p1yHtlCBUz48zd8XpqENr1eE",
        authDomain: "phedora-payouts.firebaseapp.com",
        projectId: "phedora-payouts",
        storageBucket: "phedora-payouts.appspot.com",
        messagingSenderId: "342415860715",
        appId: "1:342415860715:android:47ef8dbe89ac6acc512fae",
        measurementId: "G-87QEYBXN8Y",
      },
    };
