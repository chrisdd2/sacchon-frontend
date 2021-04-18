Background color change test commit 1

<pre>
app (admin):
    common:
        guards
        httpinteceptors ( authentication, fake api )
    model:
        user
    service:
        auth -> login, signup, islogged etc
        data -> medicaldata,consultations,statistics -> database generally
    modules:
        patient
            models:
                medical-info
                medical-data
                medical-statistics
            service:
                patient-data
        doctor
            models:
                doctor-info
                patient-data
                consultation
            service:
                doctor-data
        reporter
            model
                statistics
                patient-data
            service:
                reporter-data
</pre>