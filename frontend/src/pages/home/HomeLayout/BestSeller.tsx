import { useQuery } from "@tanstack/react-query";
import { instace } from "../../../api";
import { Products } from "../../../interface/product";

const BestSeller = () => {
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await instace.get("/products");
      return data.products || data;
    },
  });
  const displayedProducts = data?.slice(0, 4);
  return (
    <div>
      <>
        {/* Bestsaler Product Start */}
        <div className="container-fluid py-5">
          <div className="container py-5">
            <div className="text-center mx-auto mb-5" style={{ maxWidth: 700 }}>
              <h1 className="display-4">Bestseller Products</h1>
              <p>
                Latin words, combined with a handful of model sentence
                structures, to generate Lorem Ipsum which looks reasonable.
              </p>
            </div>
            <div className="row g-4">
              {displayedProducts?.map((item: Products, index: number) => (
                <div className="col-lg-6 col-xl-4" key={index}>
                  <div className="p-4 rounded bg-light">
                    <div className="row align-items-center">
                      <div className="col-6">
                        <img
                          src={item.image}
                          className="img-fluid w-100"
                          style={{ height: "50%" }}
                          alt=""
                        />
                      </div>
                      <div className="col-6">
                        <a href="#" className="h5">
                          {item.name}
                        </a>
                        <div className="d-flex my-3">
                          <i className="fas fa-star text-primary" />
                          <i className="fas fa-star text-primary" />
                          <i className="fas fa-star text-primary" />
                          <i className="fas fa-star text-primary" />
                          <i className="fas fa-star" />
                        </div>
                        <h4 className="mb-3">{item.price}</h4>
                        <a
                          href="#"
                          className="btn border border-secondary rounded-pill px-3 text-primary"
                        >
                          <i className="fa fa-shopping-bag me-2 text-primary" />
                          Add to cart
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default BestSeller;
