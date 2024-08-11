import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { useCreateUser, useUserLogin } from '@/lib/react-query/queries'
import { signupForm } from '@/lib/validation'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

const Signup = () => {
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof signupForm>> ({
        resolver: zodResolver(signupForm),
        defaultValues: {
            username: '',
            name: '',
            email: '',
            password: '',
        }
    })

    const { mutateAsync: createUser, isPending: isCreatingUser } = useCreateUser();
    const { mutateAsync: userLogin } = useUserLogin();
    async function onSubmit(user: z.infer<typeof signupForm>) {
        const newUser = await createUser(user);
        if(!newUser) {
            toast({title: "Signup Failed. Please try again."});
            return;
        }
        await userLogin({email: user.email, password: user.password})
        navigate('/')
    }
  return (
    <div className='flex justify-center items-center h-screen'>
        <div className="card">
            <div className="logo">
                <p>Snapgram</p>
            </div>
            <p className='text-gray-500 text-sm'>To use snapgram, please create your account.</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    <FormField 
                        control={form.control} 
                        name='name'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} className='input'/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control} 
                        name='username'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input {...field} className='input' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control} 
                        name='email'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} className='input' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control} 
                        name='password'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input {...field} className='input' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className='w-full'>{isCreatingUser ? "Signing up" : "Signup"}</Button>
                    <p className='text-sm'>Already have an account? <Link className='text-blue-500 font-bold' to='/signin'>Sign In</Link></p>
                </form>
            </Form>
        </div>
    </div>
  )
}

export default Signup