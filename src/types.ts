import { ContentService } from './services/content/service'
import { EmailService } from './services/email/service'
import { QueueService } from './services/queue/service'

export interface Services {
    queueService: QueueService,
    contentService: ContentService,
    emailService: EmailService,
}

export interface MailContent {
    subject: string;
    body: string;
}

export interface MessageBody {
    address: string;
    verificationCode: string;
    isVerified: false;
    verifiedDate: string | null;
}
