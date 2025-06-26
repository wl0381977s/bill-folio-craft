
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Settings, User, Bell, Shield } from 'lucide-react';
import Layout from '@/components/Layout';

const ParametresPage = () => {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Paramètres</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Profil Utilisateur
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Nom complet</Label>
                <Input id="name" placeholder="Votre nom" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="votre@email.com" />
              </div>
              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" placeholder="+213 xxx xxx xxx" />
              </div>
              <Button>Sauvegarder</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifs">Notifications par email</Label>
                <Switch id="email-notifs" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="stock-alerts">Alertes de stock</Label>
                <Switch id="stock-alerts" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="invoice-reminders">Rappels de factures</Label>
                <Switch id="invoice-reminders" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Paramètres Entreprise
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="company">Nom de l'entreprise</Label>
                <Input id="company" placeholder="Nom de votre entreprise" />
              </div>
              <div>
                <Label htmlFor="address">Adresse</Label>
                <Input id="address" placeholder="Adresse complète" />
              </div>
              <div>
                <Label htmlFor="tax-id">Numéro fiscal</Label>
                <Input id="tax-id" placeholder="Numéro d'identification fiscale" />
              </div>
              <Button>Sauvegarder</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Sécurité
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="current-password">Mot de passe actuel</Label>
                <Input id="current-password" type="password" />
              </div>
              <div>
                <Label htmlFor="new-password">Nouveau mot de passe</Label>
                <Input id="new-password" type="password" />
              </div>
              <div>
                <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button variant="outline">Changer le mot de passe</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ParametresPage;
