using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;
using Brahmasmi.Service;
using Dapper;
using System.Data;
using Microsoft.AspNetCore.Cors;
using System.Linq;
using System.Reflection;

namespace Brahmasmi.Repository
{
    [EnableCors("CorsPolicy")]
    public class VedapatashalaOnBoardingRepository : IVedapatashalaOnBoardingRepository
    {
        private readonly IDapper dapper;
        public VedapatashalaOnBoardingRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        public int vedapatashalaonboarding(VedapatashalaOnBoarding vedapatashalaonboarding)
        {
            var dbParam = new DynamicParameters();
            //dbParam.Add("VedapatashalaID", vedapatashalaonboarding.VedapatashalaID, DbType.Int32);
            dbParam.Add("NameOfVedapatashala", vedapatashalaonboarding.NameOfVedapatashala, DbType.String);
            dbParam.Add("StateID", vedapatashalaonboarding.StateID, DbType.Int32);
            dbParam.Add("CityID", vedapatashalaonboarding.CityID, DbType.Int32);
            //dbParam.Add("StateName", vedapatashalaonboarding.StateName, DbType.String);
            //dbParam.Add("CityName", vedapatashalaonboarding.CityName, DbType.String);
            dbParam.Add("MobileNumber", vedapatashalaonboarding.MobileNumber, DbType.String);
            dbParam.Add("EmailIDOfVedapatashala", vedapatashalaonboarding.EmailIDOfVedapatashala, DbType.String);
            dbParam.Add("AddressOfVedapatashala", vedapatashalaonboarding.AddressOfVedapatashala, DbType.String);
            dbParam.Add("PinCode", vedapatashalaonboarding.PinCode, DbType.String);
            dbParam.Add("Latitude", vedapatashalaonboarding.Latitude, DbType.String);
            dbParam.Add("Longitude", vedapatashalaonboarding.Longitude, DbType.String);
            dbParam.Add("NumberOfStudents", vedapatashalaonboarding.NumberOfStudents, DbType.Int32);
            dbParam.Add("AnyHelpNeeded", vedapatashalaonboarding.AnyHelpNeeded, DbType.String);
            DataTable dtCertifications = new DataTable();
            dtCertifications = GetVedapatashalaCertifications(vedapatashalaonboarding.VedapatashalaCertification);
            dbParam.Add("VedapatashalaCertification", dtCertifications.AsTableValuedParameter("dbo.TT_VedapatashalaCertifications"));
            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            var result = dapper.Execute("[dbo].[SP_Insert_VedapatashalaCertifications]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;
        }
        public DataTable GetVedapatashalaCertifications(List<VedapatashalaCertifications> lstdetails)
        {

            var table = new DataTable();
            table.Columns.Add("VedapatashalaID", typeof(int));
            table.Columns.Add("CertificationID", typeof(int));
            
           
            if (lstdetails.Count > 0)
            {
                for (int i = 0; i < lstdetails.Count(); i++)
                {
                    var row = table.NewRow();
                    if (lstdetails[i].IsChecked == true)
                    {
                        row["VedapatashalaID"] = lstdetails[i].VedapatashalaID;
                        row["CertificationID"] = lstdetails[i].CertificationID;
                        
                        table.Rows.Add(row);
                    }

                }
            }
            return table;

        }
        public List<VedapatashalaOnBoarding> GetVedapatashalaOnBoarding()
        {
            var dbParam = new DynamicParameters();
            
            var result = dapper.GetAll<VedapatashalaOnBoarding>("[dbo].[SP_Get_AllVedapatashalaOnBoarding]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
    }
}
