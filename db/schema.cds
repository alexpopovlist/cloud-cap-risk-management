namespace sap.ui.riskmanagement;

using {managed} from '@sap/cds/common';

entity Risks : managed {
  key ID          : UUID @(Core.Computed : true);
      title       : String(100);
      prio        : String(5);
      descr       : String;
      miti        : Association to Mitigations;
      impact      : Integer;
      criticality : Integer;
      supplier    : Association to Suppliers;
}

entity Mitigations : managed {
  key ID          : UUID @(Core.Computed : true);
      description : String;
      owner       : String;
      timeline    : String;
      risks       : Association to many Risks
                      on risks.miti = $self;
}

using {API_BUSINESS_PARTNER as bupa} from '../srv/external/API_BUSINESS_PARTNER';

entity Suppliers as projection on bupa.A_BusinessPartner {
  key BusinessPartner          as ID,
      BusinessPartnerFullName  as fullName,
      BusinessPartnerIsBlocked as isBlocked,
}

entity Customer : managed {
  key ID               : UUID @(Core.Computed : true);
      LegalInformation : Association to one LegalInformation;
      Address          : Association to one Address;
};

entity Address : managed {
  key ID           : Integer;
      Type         : String(100);
      Region       : String(100);
      Country      : String(100);
      State        : String(100);
      City         : String(100);
      District     : String(100);
      Street       : String(100);
      Number       : String(100);
      ZIP          : String(100);
      POBox        : String(100);
      Instructions : String(100);
};

entity LegalInformation : managed {
  key ID                      : UUID @(Core.Computed : true);
      RegistrationNumber      : String(100);
      RegistrationGroupNumber : String(100);
      RegistrationCountry     : String(100);
      RegistrationState       : String(100);
      RegistrationCity        : String(100);
      TaxID                   : Integer;
      TaxCountry              : String(100);
      TaxState                : String(100);
      TaxCity                 : String(100);
      LegalForm               : String(100);
      Name                    : String(100);
      ShortName               : String(100);
      Status                  : String(100);
      BusinessActivityCodes   : String(100);
      AddressID               : Integer;
      comments                : String(100);
};
