

            <div className="col col-1" data-label="ID">
                {product.id}
              </div>
              <div className="col col-2" data-label="Tên sản phẩm">
                {product.title}
              </div>
              <div className="col col-3" data-label="Hình ảnh">
                <img src="{product.image}" alt="" />
              </div>
              <div className="col col-4" data-label="Giá">
                {product.newprice}
              </div>
              <div className="col col-5" data-label="Mô tả">
                {product.desc}
              </div>
              <div className="col col-6" data-label="Hành động">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(product.id)}
                >
                  Xóa
                </button>{" "}
                <Link
                  to={`/admin/edit/${product.id}`}
                  className="btn btn-warning"
                >
                  Sửa
                </Link>
              </div>




 <form
      onSubmit={handleSubmit(onSubmit)}
      method="post"
      id="register-form"
      className="register-form"
      autoComplete="off"
      role="main"
    >
      <h1 className="a11y-hidden">Register Form</h1>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div>
        <label className="label-email">
          <input
            type="text"
            className="text"
            id="fullname"
            placeholder="Vui lòng nhập tên"
            {...register("fullname", { required: true })}
          />
          {errors.fullname && (
            <p className="text-danger">{errors.fullname.message}</p>
          )}
          <span className="required">Full name</span>
        </label>
      </div>
      <div>
        <label className="label-email">
          <input
            type="email"
            className="text"
            id="email"
            placeholder="Vui lòng nhập email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
          <span className="required">Email</span>
        </label>
      </div>
      <input
        type="checkbox"
        name="show-password"
        className="show-password a11y-hidden"
        id="show-password"
      />
      <label className="label-show-password" htmlFor="show-password">
        <span>Show Password</span>
      </label>
      <div>
        <label className="label-password">
          <input
            type="password"
            className="text"
            id="password"
            placeholder="Vui lòng nhập mật khẩu"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && (
            <p className="text-danger">{errors.password?.message}</p>
          )}
          <span className="required">Password</span>
        </label>
      </div>
      <input className="button-submit" type="submit" />
      <div className="email">
        <a href="#">Forgot password?</a>
      </div>
      <figure aria-hidden="true">
        <div className="person-body" />
        <div className="neck skin" />
        <div className="head skin">
          <div className="eyes" />
          <div className="mouth" />
        </div>
        <div className="hair" />
        <div className="ears" />
        <div className="shirt-1" />
        <div className="shirt-2" />
      </figure>
    </form>