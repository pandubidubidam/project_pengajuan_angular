export interface DialogUserData {
    resultUserProfileHeader: ProfilHeader;
    resultUserProfileLocation: ProfileLocation[];
    resultUserProfileJob: ProfilJob[];
}

interface ProfilHeader {
    fullname: string;
    email: string;
}

interface ProfileLocation {
    branch_name: string;
    location_name: string;
}

interface ProfilJob {
    job_code: string;
    job_desc: string;
}