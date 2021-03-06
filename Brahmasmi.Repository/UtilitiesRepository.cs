﻿using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;
using Brahmasmi.Service;
using Dapper;
using System.Data;
using Microsoft.AspNetCore.Cors;

namespace Brahmasmi.Repository
{
    [EnableCors("CorsPolicy")]
    public class UtilitiesRepository : IUtilitiesRepository
    {
        private readonly IDapper dapper;
        public UtilitiesRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        public List<City> Cities(int StateID)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("StateID", StateID, DbType.Int32);
            var result = dapper.GetAll<City>("[dbo].[SP_Get_Cities]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        //public Tuple<List<State>, List<City>> Cities(int StateID)
        //{
        //    var dbParam = new DynamicParameters();
        //    //dbParam.Add("StateID", StateID, DbType.Int32);
        //    //var result = dapper.GetAll<City>("[dbo].[SP_Get_Cities]"
        //    //     , dbParam,
        //    //     commandType: CommandType.StoredProcedure);
        //    var result = dapper.GetMultipleResult<State, City>("[dbo].[sp_testdata]"
        //         , dbParam,
        //         commandType: CommandType.StoredProcedure);
        //    return result;

        //}
        public List<Certifications> GetCertifications()
        {
            var dbParam = new DynamicParameters();

            var result = dapper.GetAll<Certifications>("SP_Get_Certifications"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public List<SocialNetwork> GetSocialNetwork()
        {
            var dbParam = new DynamicParameters();
            var result = dapper.GetAll<SocialNetwork>("[dbo].[SP_Get_SocialNetwork]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public List<Country> GetCountry()
        {
            var dbParam = new DynamicParameters();
            var result = dapper.GetAll<Country>("[dbo].[SP_Get_Countries]", dbParam
                 , commandType: CommandType.StoredProcedure);
            return result;

        }
        public List<State> GetStates(int CountryID)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("CountryID", CountryID, DbType.Int32);
            var result = dapper.GetAll<State>("[dbo].[SP_Get_AllStates]", dbParam
                 , commandType: CommandType.StoredProcedure);
            return result;

        }
        public List<State> GetState()
        {
            var dbParam = new DynamicParameters();
            var result = dapper.GetAll<State>("[dbo].[SP_Get_States]", dbParam
                 , commandType: CommandType.StoredProcedure);
            return result;

        }
        public List<Title> GetTitle()
        {
            var dbParam = new DynamicParameters();
            var result = dapper.GetAll<Title>("[dbo].[SP_Get_Title]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }

        public List<City> AllCities()
        {
            var dbParam = new DynamicParameters();
            var result = dapper.GetAll<City>("[dbo].[SP_Get_AllCities]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public int SavePatient(Patient patient)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("PatientName", patient.PatientName, DbType.String);
            dbParam.Add("PatientIllness", patient.PatientIllness, DbType.String);
            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            int result = dapper.Execute("[dbo].[sp_savepatient]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;
        }
        public List<AdminVendor> GetVendor(int cityId)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("cityId", cityId, DbType.Int32);
            var result = dapper.GetAll<AdminVendor>("[dbo].[SP_GETVENDORS]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public List<Patient> GetPatientData()
        {
            var dbParam = new DynamicParameters();
            var result = dapper.GetAll<Patient>("[dbo].[SP_GetPatientData]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public int ScheduleMeeting(Meeting meeting)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("MeetingId", meeting.MeetingId, DbType.String);
            dbParam.Add("MeetingPassword", meeting.MeetingPassword, DbType.String);
            dbParam.Add("MEETINGSIGNATURE", meeting.Signature, DbType.String);
            dbParam.Add("BookingId", meeting.BookingId, DbType.String);
            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            var result = dapper.Execute("[dbo].[SP_SCHEDULEMEETING]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public Meeting GetMeetingDetails(int bookingid)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("bookingid", bookingid, DbType.Int32);
            var result = dapper.Get<Meeting>("[dbo].[SP_GETMEETINGDETAILS]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;
        }
        public List<Language> GetLanguages()
        {
            var dbParam = new DynamicParameters();
            var result = dapper.GetAll<Language>("[dbo].[SP_Get_Languages]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public List<StoreVendor> GetStores(int cityId)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("cityId", cityId, DbType.Int32);
            var result = dapper.GetAll<StoreVendor>("[dbo].[SP_GETSTORES]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public MeetingCredentials GetMeetingCredentials()
        {
            var dbParam = new DynamicParameters();
            var result = dapper.Get<MeetingCredentials>("[dbo].[SP_GETMEETINGCREDENTIALS]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public List<Education> GetEducations()
        {
            var dbParam = new DynamicParameters();
            var result = dapper.GetAll<Education>("[dbo].[SP_Get_AllEducations]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public List<IndustryTypes> GetIndustryTypes()
        {
            var dbParam = new DynamicParameters();
            var result = dapper.GetAll<IndustryTypes>("[dbo].[SP_Get_AllIndustryTypes]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;
        }
        public List<VirtualPlatform> GetVirtualPlatforms()
        {
            var dbParam = new DynamicParameters();
            var result = dapper.GetAll<VirtualPlatform>("[dbo].[SP_Get_VirtualPlatforms]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;
        }
    }
}
