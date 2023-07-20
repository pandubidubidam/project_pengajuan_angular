export interface ResponseLogin {
    status: StatusLogin;
    result?: ResultLogin;
}

interface StatusLogin {
    responseCode: number;
    responseDesc: string;
}

interface ResultLogin {
    status: boolean;
    data: DataInfoLogin;
}

export interface DataInfoLogin {
    userId: string,
    password: string,
    name: string,
    level: string,
    jobDesc: string
}

interface ProfileHeader {
    nik: string;
    fullname: string;
    parent_nik: string;
    hp_no: string;
    email: string;
    portfolio_desc: string;
    last_login_date: string;
}

interface ProfileRole {
    role_code: string;
}

interface ProfileLocation {
    branch_code: string;
    branch_name: string;
    location_code: string;
    location_name: string;
}

interface ProfileJob {
    job_code: string;
    job_desc: string;
}

interface ProfileAuth {
    auth_alias: string;
}

export interface ProfileMenu {
    menuCode: string;
    menuName: string;
    icon: string;
    url: string;
    details: DetailMenu[];
}

interface DetailMenu {
    functionCode: string;
    functionName: string;
    functionMethod: string;
    functionPath: string;
    parentCode: string;
}


