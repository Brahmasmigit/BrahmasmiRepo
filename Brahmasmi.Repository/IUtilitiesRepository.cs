using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;

namespace Brahmasmi.Repository
{
    public interface IUtilitiesRepository
    {
        List<City> Cities(int StateID);
        List<SocialNetwork> GetSocialNetwork();

        List<State> GetState();

        List<Title> GetTitle();

        List<Certifications> GetCertifications();

        int SavePatient(Patient patient);

        List<Patient> GetPatientData();
    }
}
