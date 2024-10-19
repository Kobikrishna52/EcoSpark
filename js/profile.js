urlParams = new URLSearchParams(window.location.search);
id = urlParams.get('id');
console.log("id here " + id);
if (id) {
    $('#edit-btn').click(function () {
        $('#status').text(" ");
        const fname = $('#fname').text();
        const lname = $('#lname').text();
        const dob = $('#dob').val();
        var year = new Date(dob).getFullYear();
        var curryear = new Date().getFullYear();
        const age = curryear - year;
        const gender = $('#gender').val();
        const mobile = $('#mobile').text();
        const district = $('#district').val();
        const pincode = $('#pincode').text();
        const state = $('#state').val();
        const address = $('#address').text();
        if (mobile.length !== 10) {
            $('#status').text('Mobile number must be exactly 10 digits long.').css('color', 'red');
            return;
        }
        if (age < 12) {
            $('#status').text('user must be atleast 12 years old').css('color', 'red');
            return;
        }
        console.log("id from uppdate " + id);
        $.ajax({
            type: 'POST',
            url: '../php/UpdateUserProfile.php',
            data: {
                id: id,
                fname: fname,
                lname: lname,
                dob: dob,
                age: age,
                gender: gender,
                mobile: mobile,
                district: district,
                state: state,
                pincode: pincode,
                address: address
            },
            success: function (data) {
                if (data.error) {
                    console.log(data.error);
                } else {
                    console.log(data);
                    $('#fname').text(data.fname);
                    $('#lname').text(data.lname);
                    $('#age').text(data.age);
                    $('#gender').val(data.gender);
                    $('#mailid').text(data._id);
                    $('#mobile').text(data.mobile);
                    $('#dob').val(data.dob);
                    $('#pincode').text(data.pincode);
                    $('#address').text(data.address);
                    $('#state').val(data.state);
                    $('#district').val(data.district);
                    $('#status').text('Profile updated successfully.').css('color', 'green');
                }
            },
            error: function (xhr, status, error) {
                $('#status').text('');
                console.error('AJAX Error: ' + status + error);
            }
        });
    });
} else {
    console.log('No user logged in.');
}
