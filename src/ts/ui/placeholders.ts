import $ from "jquery";
import { api } from "../api/request";

let username = "%username%";
let userpic = "";
let userid = "";
let instance = localStorage.getItem("instance");

api(instance, "/api/v1/accounts/verify_credentials", true, "GET", {}, localStorage.getItem("token")).then((data) => {
    username = data.username;
    userpic = data.avatar;
    userid = data.id;
    localStorage.setItem("userid", data.id);
});

export function initializePlaceholders() {
    window.setInterval(() => {
        $(".username").html(username);
        let protocol = "https://";
        if (instance.startsWith("localhost")) {
            protocol = "http://";
        }
        $(".edit-profile").attr("href", `${protocol}${instance}/settings/profile`);
    });
}

$(document).ready(() => {
    $(".userpic").attr("src", userpic);
    $(".userlink").attr("href", `/user?id=${userid}`);
    window.setInterval(() => {
        $(".userpic").attr("src", userpic);
        $(".userlink").attr("href", `/user?id=${userid}`);
    }, 1000);
});