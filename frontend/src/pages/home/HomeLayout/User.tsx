import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Users } from "../../../interface/users";

const ProfilePage = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data, error, isLoading } = useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:8080/user/${id}`);
      reset(data.users);
      return data;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (updatedUser) => {
      await axios.put(`http://localhost:8080/user/${id}`, updatedUser);
    },
    onSuccess: () => {
      alert("sửa tài khoản thành công");
      queryClient.invalidateQueries({
        queryKey: ["user", id],
      });
    },
  });

  const onSubmit = (data: Users) => {
    mutate(data);
  };

  if (isLoading)
    return (
      <div className="container mt-5">
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="container mt-5">
        <p>Error: {error.message}</p>
      </div>
    );

  return (
    <div className="container mt-5">
      {data?.users && (
        <div className="row">
          {/* Avatar and Basic Info */}
          <div className="col-md-4">
            <div className="card">
              <img
                src={data.users.avatar || "https://via.placeholder.com/150"}
                className="card-img-top"
                alt="Avatar"
              />
            </div>
          </div>

          {/* Form for Editing Information */}
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Edit Profile</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      {...register("username", {
                        required: "Username is required",
                      })}
                    />
                    {errors.username && (
                      <div className="text-danger">
                        {errors.username.message}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && (
                      <div className="text-danger">{errors.email.message}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phoneNumber"
                      {...register("phoneNumber")}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      {...register("address")}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="gender" className="form-label">
                      Gender
                    </label>
                    <select
                      className="form-select"
                      id="gender"
                      {...register("gender")}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
