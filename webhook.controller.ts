import { Body, Controller, Post } from '@nestjs/common';
import { ReadingService } from './reading.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly readingService: ReadingService) {}
  @Post('payment-webhook')
  async handlePaymentWebhook(@Body() paymentData: any) {
    const { tx_ref, status, amount, email, phone_number } = paymentData;
     console.log('Payment Data received:', paymentData);

    if (status === 'successful') {
      await this.readingService.updatePaymentStatus(tx_ref, amount);
      console.log(`Payment with tx_ref ${tx_ref} was successful.`);
    } else {
      console.log(`Payment with tx_ref ${tx_ref} failed. Status: ${status}`);
    }
  }
}
