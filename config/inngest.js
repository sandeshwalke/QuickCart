import { serve } from "inngest/next";
import { inngest, syncUserCreation, syncUserDeletion, syncUserUpdation } from "../../../config/inngest";

export const { GET, POST } = serve({
  client: inngest,
  functions: [syncUserCreation, syncUserDeletion, syncUserUpdation],
});


export const syncUserCreation = inngest.createFunction(
    {
        id:'sync-user-from-clerk'
    },
    {event: 'clerk/user.created'},

    async (event) => {
        const { id, first_name, last_name, email_addresses, image_url} = event.data
        const userData = {
            _id:id,
            email:email_addresses[0],
            name:first_name + ' ' + last_name,
            imageUrl: image_url
        }
        await connectDB()
        await User.create(userData)

    }
)

export const syncUserUpdation = inngest.createFunction(
    {
       id: 'update-user-from-clerk' 
    },
    {event: 'clerk/user.updated'},
    async ({event}) => {
        const { id, first_name, last_name, email_addresses, image_url} = event.data
        const userData = {
            _id:id,
            email:email_addresses[0],
            name:first_name + ' ' + last_name,
            imageUrl: image_url
        }
        await connectDB()
        await User.findByIdAndUpdate(id,userData)
    }
)


export const syncUserDeletion = inngest.createFunction(
    {
        id: 'delete-user-with-clerk'
    },
    {event: 'clerk/user.deleted'},
    async({event}) => {
        const{id}= event.data
        await connectDB()
        await User.findByIdAndDelete(id)
    }

)