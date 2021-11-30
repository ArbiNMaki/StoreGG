import { useState } from "react";
import { toast } from "react-toastify";
import { setCheckout } from "../../../services/player";
import { useRouter } from "next/router";

export default function CheckoutConfirmation() {
    const [checkbox, setCheckbox] = useState(false);
    const router = useRouter();

    const onSubmit = async () => {
        const dataItemLocal = localStorage.getItem("data-item");
        const dataTopupLocal = localStorage.getItem("data-topup");

        const dataItem = JSON.parse(dataItemLocal!);
        const dataTopup = JSON.parse(dataTopupLocal!);

        if (!checkbox) {
            toast.error("Pastikan anda telah melakukan pembayaran!", {
                theme: "colored",
            });
            return;
        }

        const data = {
            voucher: dataItem._id,
            nominal: dataTopup.nominalItem._id,
            payment: dataTopup.paymentItem.payment._id,
            bank: dataTopup.paymentItem.bank._id,
            name: dataTopup.bankAccountName,
            accountUser: dataTopup.verifyID,
        };

        const response = await setCheckout(data);
        if (response.error) {
            toast.error(response.message, { theme: "colored" });
        } else {
            toast.success("Checkout Berhasil", { theme: "colored" });
            router.push("/complete-checkout");
        }
    };

    return (
        <>
            <label className="checkbox-label text-lg color-palette-1">
                I have transferred the money
                <input
                    type="checkbox"
                    checked={checkbox}
                    onChange={() => setCheckbox(!checkbox)}
                />
                <span className="checkmark" />
            </label>
            <div className="d-md-block d-flex flex-column w-100 pt-50">
                <button
                    className="btn btn-confirm-payment rounded-pill fw-medium text-white border-0 text-lg"
                    type="button"
                    onClick={onSubmit}
                >
                    Confirm Payment
                </button>
            </div>
        </>
    );
}
