var analytics_tab = document.getElementById("analytics-tab");
var user_management = document.getElementById("user-management-tab");
var blog_management = document.getElementById("blog-management-tab");
var video_conferencing = document.getElementById("video-conferencing-tab");
blog_management.style.display = "none";
user_management.style.display = "none";
video_conferencing.style.display = "none";


// document.getElementById("analytics-tab").style.display="none";
function toggleDashboardView(evt) {
    analytics_tab.style.display = "none";
    user_management.style.display = "none";
    blog_management.style.display = "none";
    video_conferencing.style.display = "none";

    var target_element = evt;
    switch (target_element.id) {
        case "user_management_a":
            user_management.style.display = "block";
            break;
        case "analytics_a":
            analytics_tab.style.display = "block";
            break;
        case "blog_management_a":
            blog_management.style.display = "block";
            break;
        case "video_chat":
            video_conferencing.style.display= "block";
            break;
    }
}