import { confirmBooking } from "@/api/bookings"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { useParams } from "react-router"

const Payment = () => {

    // const [timer, setTimer] = useState(10)

    useEffect(() => {

    }, [])
    const {bookingId} = useParams<{bookingId: string}>()
    const queryClient = useQueryClient()
    
    
    const { mutate: confirmPayment} = useMutation({
    
      mutationFn: () => {
      
      console.log("done room check up")
      
      return confirmBooking(String(bookingId))
    },
    onSuccess: (data) => {
      console.log("Paid. Check My Bookings")
      console.log(data)


      


      queryClient.invalidateQueries({queryKey: ["my-bookings"]})
    },
    onError: () => {
      console.log("Booking failed.")

    }
  })

    const months = [
  { label: "MM", value: null },
  { label: "01", value: "01" },
  { label: "02", value: "02" },
  { label: "03", value: "03" },
  { label: "04", value: "04" },
  { label: "05", value: "05" },
  { label: "06", value: "06" },
  { label: "07", value: "07" },
  { label: "08", value: "08" },
  { label: "09", value: "09" },
  { label: "10", value: "10" },
  { label: "11", value: "11" },
  { label: "12", value: "12" },
]

const years = [
  { label: "YYYY", value: null },
  { label: "2024", value: "2024" },
  { label: "2025", value: "2025" },
  { label: "2026", value: "2026" },
  { label: "2027", value: "2027" },
  { label: "2028", value: "2028" },
  { label: "2029", value: "2029" },
]

  return (
    <div className="">

    <div className="w-full max-w-md m-auto relative top-35">
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Payment Method</FieldLegend>
            <FieldDescription>
              All transactions are secure and encrypted
            </FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                  Name on Card
                </FieldLabel>
                <Input
                  id="checkout-7j9-card-name-43j"
                  placeholder="Evil Rabbit"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                  Card Number
                </FieldLabel>
                <Input
                  id="checkout-7j9-card-number-uw1"
                  placeholder="1234 5678 9012 3456"
                  required
                />
                <FieldDescription>
                  Enter your 16-digit card number
                </FieldDescription>
              </Field>
              <div className="grid grid-cols-3 gap-4">
                <Field>
                  <FieldLabel htmlFor="checkout-exp-month-ts6">
                    Month
                  </FieldLabel>

                  <Select items={months}>
                    <SelectTrigger id="checkout-exp-month-ts6">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>

                      <SelectGroup>
                        {months.map((item, i) => (
                          <SelectItem key={"month" + i} value={String(item.value)}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>

                    </SelectContent>
                  </Select>
                </Field>



                <Field>
                  <FieldLabel htmlFor="checkout-7j9-exp-year-f59">
                    Year
                  </FieldLabel>
                  <Select items={years}>
                    <SelectTrigger id="checkout-7j9-exp-year-f59">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>

                      <SelectGroup>
                        {years.map((item, i) => (
                          <SelectItem key={"year"+i} value={String(item.value)}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>

                    </SelectContent>
                  </Select>

                </Field>

                <Field>
                  <FieldLabel htmlFor="checkout-7j9-cvv">CVV</FieldLabel>
                  <Input id="checkout-7j9-cvv" placeholder="123" required/>
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
        
       
          <Field orientation="horizontal">
            <Button type="button" onClick={() => confirmPayment()}>Confirm Payment</Button>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  


    </div>
  )
}

export default Payment