import { object, string, date, mixed, number, ref } from "yup"

class ValidateVacationService {
    public validateVacationSchema = object().shape({
        destination:
            string()
                .required("Destination is required")
                .min(2, "Destination should be minimum 2 characters")
                .max(50, "Destination should be maximum 50 characters")
                .trim(),
        description:
            string()
                .required("Description is required")
                .min(2, "Description should be minimum 2 characters")
                .max(1000, "Description should be maximum 1000 characters")
                .trim(),
        fromDate:
            date()
                .nullable()
                .transform((curr: string, orig: string) => orig === '' ? null : curr)
                .min(new Date(), "Arrival date must be later then current date")
                .max(ref("toDate"), "Arrival date must be before Return ")
                .required('Arrival date is required'),
        toDate:
            date()
                .nullable()
                .transform((curr: string, orig: string) => orig === '' ? null : curr)
                .min(ref("fromDate"), "Return date must be after Arrival ")
                .required('Return date is required'),
        price:
            number()
                .typeError('Price is required')
                .min(0, 'Price can\'t be negative')
                .max(10000, 'Price can\'t exceed 10000'),
        image:
            mixed()
                .test('file', "File is required", (value) => {
                    return value.length > 0
                })

                .test('fileType', 'Unsupported File Format. Supports: jpg', (value) => {
                    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg'];
                    return SUPPORTED_FORMATS.includes(value[0]?.type)
                })
                .test('fileSize', "File Size is too large limit is 1 MB", value => {
                    const sizeInBytes = 1000000
                    return value[0]?.size <= sizeInBytes;
                })

    })
}

const validateVacationService = new ValidateVacationService

export default validateVacationService

