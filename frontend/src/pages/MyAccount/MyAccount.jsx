import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

import {
    getUserById,
    updateUser,
    updateProfileImage
} from "../../services/UserServices";

import "./MyAccount.css";

export default function MyAccount() {


    const { user, login } = useContext(AuthContext);
    
    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);

    const [editMode, setEditMode] = useState(false);

    const [saving, setSaving] = useState(false);

    const [uploading, setUploading] = useState(false);

    const [selectedImage, setSelectedImage] = useState(null);

    const [previewImage, setPreviewImage] = useState(null);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
    });


    useEffect(() => {

        if (user?.id) {

            loadProfile();

        } else {

            setLoading(false);

        }

    }, [user]);


    async function loadProfile() {

        try {

            setLoading(true);

            const response =
                await getUserById(user.id);

            const data = response.data;

            setProfile(data);

            setFormData({
                firstName: data.firstName || "",
                lastName: data.lastName || "",
                email: data.email || "",
                phone: data.phone || ""
            });


            if (data.profileImage) {
                setPreviewImage(data.profileImage);


            } else {

                setPreviewImage(null);

            }

        } catch (error) {

            console.error(
                "Failed to load profile:",
                error
            );

        } finally {

            setLoading(false);

        }

    }


    function handleChange(e) {

        const {
            name,
            value
        } = e.target;

        setFormData((previous) => ({

            ...previous,

            [name]: value

        }));

    }


    function handleImageSelect(e) {

        const file = e.target.files?.[0];

        if (!file) {

            return;

        }


       if (!file || !file.type.startsWith("image/")) {

    alert("Please select a valid image file.");

    e.target.value = "";

    return;

}


        if (file.size > 5 * 1024 * 1024) {

            alert(
                "Image size should be less than 5 MB."
            );

            e.target.value = "";

            return;

        }


        setSelectedImage(file);

        setPreviewImage(
            URL.createObjectURL(file)
        );

    }


    async function handleImageUpload() {

        if (!selectedImage) {

            alert(
                "Please select a profile image."
            );

            return;

        }


        try {

            setUploading(true);

const response = await updateProfileImage(user.id, selectedImage);

const updatedUser = response.data;

setProfile(updatedUser);

// Force latest image
setPreviewImage(updatedUser.profileImage);

login(updatedUser);

localStorage.setItem(
    "user",
    JSON.stringify(updatedUser)
);

setSelectedImage(null);

alert("Profile photo updated successfully.");

        } catch (error) {

            console.error(
                "Profile image upload failed:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to update profile photo."
            );

        } finally {

            setUploading(false);

        }

    }


    async function handleSaveProfile() {

        if (
            !formData.firstName.trim() ||
            !formData.lastName.trim() ||
            !formData.email.trim() ||
            !formData.phone.trim()
        ) {

            alert(
                "Please fill all fields."
            );

            return;

        }


        if (
            !/^[0-9]{10}$/.test(
                formData.phone
            )
        ) {

            alert(
                "Phone number must contain exactly 10 digits."
            );

            return;

        }


        try {

            setSaving(true);

            const response =
                await updateUser(
                    user.id,
                    formData
                );

            const updatedUser =
                response.data;

            setProfile(updatedUser);

            setFormData({
                firstName:
                    updatedUser.firstName || "",

                lastName:
                    updatedUser.lastName || "",

                email:
                    updatedUser.email || "",

                phone:
                    updatedUser.phone || ""
            });


            /*
             * Update login/localStorage
             */
            login(updatedUser);


            /*
             * Keep current profile image
             */
            if (updatedUser.profileImage) {

    setPreviewImage(updatedUser.profileImage);

}


            setEditMode(false);

            alert(
                "Profile updated successfully."
            );

        } catch (error) {

            console.error(
                "Profile update failed:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to update profile."
            );

        } finally {

            setSaving(false);

        }

    }


    function handleCancelEdit() {

        if (!profile) {

            return;

        }


        setFormData({

            firstName:
                profile.firstName || "",

            lastName:
                profile.lastName || "",

            email:
                profile.email || "",

            phone:
                profile.phone || ""

        });


        setEditMode(false);

    }


    if (!user) {

        return (

            <div className="account-login-page">

                <div className="account-login-card">

                    <div className="account-login-icon">
                        🔐
                    </div>

                    <h2>
                        Login Required
                    </h2>

                    <p>
                        Please login to view your account.
                    </p>

                    <Link to="/login">

                        <button>
                            Login
                        </button>

                    </Link>

                </div>

            </div>

        );

    }


    if (loading) {

        return (

            <div className="account-loading">

                Loading Profile...

            </div>

        );

    }


    if (!profile) {

        return (

            <div className="account-loading">

                Unable to load profile.

            </div>

        );

    }


    /*
     * Default first letter
     */
    const firstLetter =
        profile.firstName
            ?.charAt(0)
            ?.toUpperCase() || "U";


    return (

        <div className="account-page">


            {/* =========================
                HEADER
            ========================== */}

            <div className="account-header">

                <span>
                    MY ACCOUNT
                </span>

                <h1>
                    Profile
                </h1>

                <p>
                    Manage your ShopKart account details.
                </p>

            </div>


            {/* =========================
                ACCOUNT CARD
            ========================== */}

            <div className="account-card">


                {/* =========================
                    PROFILE TOP
                ========================== */}

                <div className="profile-top">


                    {/* PROFILE PHOTO */}

                    <div className="profile-photo-section">

                        <div className="profile-image-wrapper">


                            {previewImage ? (

                                <img
                                    src={previewImage}
                                    alt="Profile"
                                    className="profile-image"
                                    onError={(e)=>{
    console.log("Image failed", e.target.src);
}}
                                    // onError={(e) => {

                                    //     e.currentTarget.style.display =
                                    //         "none";

                                    // }}
                                />

                            ) : (

                                <div className="profile-initial">

                                    {firstLetter}

                                </div>

                            )}


                        </div>


                        <div className="photo-actions">

                            <label
                                htmlFor="profileImage"
                                className="choose-photo-btn"
                            >
                                Change Photo
                            </label>


                            <input
                                id="profileImage"
                                type="file"
                                accept="image/*"
                                onChange={
                                    handleImageSelect
                                }
                                hidden
                            />


                            {selectedImage && (

                                <button
                                    className="upload-photo-btn"
                                    onClick={
                                        handleImageUpload
                                    }
                                    disabled={uploading}
                                >

                                    {uploading
                                        ? "Uploading..."
                                        : "Upload Photo"
                                    }

                                </button>

                            )}

                        </div>

                    </div>


                    {/* PROFILE NAME */}

                    <div className="profile-heading">

                        <h2>

                            {profile.firstName}{" "}

                            {profile.lastName}

                        </h2>


                        <span className="role-badge">

                            {profile.role}

                        </span>


                        <span
                            className={
                                profile.active
                                    ? "account-status active"
                                    : "account-status inactive"
                            }
                        >

                            {profile.active
                                ? "Active Account"
                                : "Inactive Account"}

                        </span>

                    </div>

                </div>


                {/* =========================
                    VIEW DETAILS
                ========================== */}

                {!editMode ? (

                    <>


                        <div className="details-grid">


                            <div className="detail-box">

                                <span>
                                    FIRST NAME
                                </span>

                                <strong>
                                    {profile.firstName}
                                </strong>

                            </div>


                            <div className="detail-box">

                                <span>
                                    LAST NAME
                                </span>

                                <strong>
                                    {profile.lastName}
                                </strong>

                            </div>


                            <div className="detail-box">

                                <span>
                                    EMAIL
                                </span>

                                <strong>
                                    {profile.email}
                                </strong>

                            </div>


                            <div className="detail-box">

                                <span>
                                    PHONE
                                </span>

                                <strong>
                                    {profile.phone}
                                </strong>

                            </div>


                            <div className="detail-box">

                                <span>
                                    ROLE
                                </span>

                                <strong>
                                    {profile.role}
                                </strong>

                            </div>


                            <div className="detail-box">

                                <span>
                                    ACCOUNT STATUS
                                </span>

                                <strong
                                    className={
                                        profile.active
                                            ? "active-text"
                                            : "inactive-text"
                                    }
                                >

                                    {profile.active
                                        ? "Active"
                                        : "Inactive"}

                                </strong>

                            </div>


                        </div>


                        <div className="account-buttons">


                            <button
                                className="edit-profile-btn"
                                onClick={() =>
                                    setEditMode(true)
                                }
                            >
                                Edit Profile
                            </button>


                            <Link to="/my-orders">

                                <button
                                    className="orders-btn"
                                >
                                    My Orders
                                </button>

                            </Link>


                        </div>


                    </>

                ) : (


                    /* =========================
                       EDIT PROFILE
                    ========================== */

                    <div className="edit-profile-section">


                        <h2>
                            Edit Profile
                        </h2>

                        <p>
                            Update your personal information.
                        </p>


                        <div className="edit-form-grid">


                            <div className="input-group">

                                <label>
                                    First Name
                                </label>

                                <input
                                    type="text"
                                    name="firstName"
                                    value={
                                        formData.firstName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="First Name"
                                />

                            </div>


                            <div className="input-group">

                                <label>
                                    Last Name
                                </label>

                                <input
                                    type="text"
                                    name="lastName"
                                    value={
                                        formData.lastName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Last Name"
                                />

                            </div>


                            <div className="input-group">

                                <label>
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={
                                        formData.email
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Email"
                                />

                            </div>


                            <div className="input-group">

                                <label>
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    value={
                                        formData.phone
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    maxLength="10"
                                    placeholder="10 digit phone number"
                                />

                            </div>


                        </div>


                        <div className="edit-actions">


                            <button
                                className="cancel-btn"
                                onClick={
                                    handleCancelEdit
                                }
                                disabled={saving}
                            >
                                Cancel
                            </button>


                            <button
                                className="save-profile-btn"
                                onClick={
                                    handleSaveProfile
                                }
                                disabled={saving}
                            >

                                {saving
                                    ? "Saving..."
                                    : "Save Changes"
                                }

                            </button>


                        </div>


                    </div>

                )}

            </div>

        </div>

    );

}