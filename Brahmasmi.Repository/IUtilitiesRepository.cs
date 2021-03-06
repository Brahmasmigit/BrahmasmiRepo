﻿using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;

namespace Brahmasmi.Repository
{
    public interface IUtilitiesRepository
    {
        List<City> Cities(int StateID);

        //Tuple<List<State>, List<City>> Cities(int StateID);
        List<SocialNetwork> GetSocialNetwork();

        List<State> GetState();
        List<Country> GetCountry();
        List<State> GetStates(int CountryID);

        List<Title> GetTitle();

        List<Certifications> GetCertifications();

        List<City> AllCities();

        int SavePatient(Patient patient);

        List<Patient> GetPatientData();

        List<AdminVendor> GetVendor(int cityId);

        int ScheduleMeeting(Meeting meeting);

        Meeting GetMeetingDetails(int bookingid);

        List<Language> GetLanguages();

        List<StoreVendor> GetStores(int cityId);

        MeetingCredentials GetMeetingCredentials();
        List<Education> GetEducations();
        List<IndustryTypes> GetIndustryTypes();
        List<VirtualPlatform> GetVirtualPlatforms();
    }
}
