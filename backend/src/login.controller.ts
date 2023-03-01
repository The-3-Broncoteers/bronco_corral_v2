import { Body, Controller, Get, Post } from '@nestjs/common/decorators';

@Controller('login')

export class LoginController {

    @Post('login')
    login(@Body() body: { email: string, password: string }): { message: string } {
        // Here, we would do some logic to check if the email and password are valid
        // For this example, we'll just return a success message if the data is correct
        if (body.email === 'user@example.com' && body.password === 'password') {
            return { message: 'Login successful' };
        } else {
            throw new Error('Invalid login');
        }
    }
}