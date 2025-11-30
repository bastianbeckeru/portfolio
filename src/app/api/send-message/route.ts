/* import { NextResponse } from 'next/server';
import { WhatsAppClient } from '@kapso/whatsapp-cloud-api';

export async function POST(request: Request) {
  try {
    const { phoneNumber, message } = await request.json();

    // Validación básica
    if (!phoneNumber || !message) {
      return NextResponse.json(
        { success: false, error: 'Número y mensaje son requeridos' },
        { status: 400 }
      );
    }

    // Validar formato del número (debe incluir código de país con +)
    const formattedPhone = phoneNumber.startsWith('+')
      ? phoneNumber
      : `+${phoneNumber}`;

    // Inicializar cliente de WhatsApp
    const client = new WhatsAppClient({
      baseUrl: 'https://app.kapso.ai/api/meta/',
      kapsoApiKey: process.env.KAPSO_API_KEY!,
    });

    // Enviar mensaje
    const response = await client.messages.sendText({
      phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID!,
      to: formattedPhone,
      body: message,
    });

    return NextResponse.json({
      success: true,
      data: response,
    });
  } catch (error: any) {
    console.error('Error al enviar mensaje:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error al enviar el mensaje',
      },
      { status: 500 }
    );
  }
}
 */
