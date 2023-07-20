import { ResponseLogin } from "../models/response.model";

export const DummyDataUser: ResponseLogin = {
    status: {
        responseCode: 200,
        responseDesc: "Login Success"
    },
    result: {
        status: true,
        data: {
            resultUserProfileHeader: {
                nik: "12345",
                fullname: "Admin SU Pengajuan",
                parent_nik: "911",
                hp_no: "082130090010",
                email: "adm_pgjn@adm.co.id",
                portfolio_desc: "",
                last_login_date: "Juni 2023"
            },
            resultProfileUserRole: [
                {
                    role_code: "PENGAJU"
                },
                {
                    role_code: "APPROVER1"
                },
                {
                    role_code: "APPROVER2"
                },
                {
                    role_code: "APPROVER3"
                },
                {
                    role_code: "APPROVER4"
                },
                {
                    role_code: "APPROVER5"
                },
                {
                    role_code: "APPROVER6"
                },
                {
                    role_code: "APPROVER7"
                }
            ],
            resultUserProfileLocation: [
                {
                    branch_code: "0001",
                    branch_name: "Pekanbaru",
                    location_code: "0211SR0048",
                    location_name: "Pekanbaru"
                }
            ],
            resultUserProfileJob: [
                {
                    job_code: "106",
                    job_desc: "Area Manager"
                }
            ],
            resultUserProfileMenu: [
                 {
                menuCode: "590000000",
                menuName: "Pengajuan",
                details: [
                    {
                        "functionCode": "view",
                        "functionName": "View",
                        "functionMethod": "GET,POST,PUT,UPDATE,DELETE",
                        "functionPath": "/external/590000000",
                        "parentCode": "510000000"
                    }
                ],
                icon: "menu",
                url: "/external/590000000"
            },
            {
                menuCode: "590010000",
                menuName: "Pengajuan Baru",
                details: [
                    {
                        "functionCode": "view",
                        "functionName": "View",
                        "functionMethod": "GET,POST,PUT,UPDATE,DELETE",
                        "functionPath": "/external/590010000",
                        "parentCode": "590000000"
                    }
                ],
                icon: "assignment",
                url: "/external/590010000"
            },
            {
                menuCode: "590020000",
                menuName: "Persetujuan",
                details: [
                    {
                        "functionCode": "view",
                        "functionName": "View",
                        "functionMethod": "GET,POST,PUT,UPDATE,DELETE",
                        "functionPath": "/external/590020000",
                        "parentCode": "590000000"
                    }
                ],
                icon: "history_edu",
                url: "/external/590020000"
            },
            {
                menuCode: "590030000",
                menuName: "Lacak Pengajuan",
                details: [
                    {
                        "functionCode": "view",
                        "functionName": "View",
                        "functionMethod": "GET,POST,PUT,UPDATE,DELETE",
                        "functionPath": "/external/590030000",
                        "parentCode": "590000000"
                    }
                ],
                icon: "content_paste_search",
                url: "/external/590030000"
            },
        ],
            token: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMDAxNDIzNiIsImV4cCI6MTY2MjcxNDgzNSwiaWF0IjoxNjYyNjI4NDM1fQ.xY7dwYfOY5YU1PoG4Dsru2EoP4zjs7fejiTaGdF4Qwal8F9CCos_799PBaB9yT6Sy97YRrIjstgBCPRuwKLwbA"
        }
    }
}