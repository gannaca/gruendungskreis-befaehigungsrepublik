import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

interface FormData {
  vorname: string
  nachname: string
  email: string
  organisation?: string
  beitrag_information: boolean
  beitrag_expertise: boolean
  beitrag_finanziell: boolean
  datenschutz: boolean
}

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>()

  const watchBeitrag = watch(['beitrag_information', 'beitrag_expertise', 'beitrag_finanziell'])
  const hasSelectedBeitrag = watchBeitrag.some(Boolean)

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Netlify Forms submission
      const formData = new FormData()
      formData.append('form-name', 'gruendungskreis')
      formData.append('vorname', data.vorname)
      formData.append('nachname', data.nachname)
      formData.append('email', data.email)
      formData.append('organisation', data.organisation || '')
      formData.append('beitrag_information', data.beitrag_information ? 'Ja' : 'Nein')
      formData.append('beitrag_expertise', data.beitrag_expertise ? 'Ja' : 'Nein')
      formData.append('beitrag_finanziell', data.beitrag_finanziell ? 'Ja' : 'Nein')

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString()
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      setSubmitError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg-primary relative overflow-hidden">
      {/* Background Grid */}
      <div className="fixed inset-0 bg-grid pointer-events-none" />

      {/* Gradient Overlays */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-magenta/5 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 px-6 py-12 md:py-20">
        <div className="max-w-3xl mx-auto">

          {/* Hero Section */}
          <section className="text-center mb-16 md:mb-24 animate-fade-in-up">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 mb-8">
              <span className="w-2 h-2 bg-accent-cyan rounded-full animate-pulse-subtle" />
              <span className="font-mono text-xs tracking-[0.3em] text-accent-cyan uppercase">
                Gründungskreis
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[0.95]">
              <span className="bg-gradient-to-r from-white to-accent-cyan bg-clip-text text-transparent">
                VOM GLAUBEN
              </span>
              <br />
              <span className="text-white">
                ZUM GESTALTEN.
              </span>
            </h1>

            {/* Subtitle */}
            <h2 className="text-xl md:text-2xl font-light text-text-secondary mb-8 max-w-2xl mx-auto">
              Werden Sie Teil des <span className="text-accent-cyan font-medium">Gründungskreises Befähigungsrepublik</span>.
            </h2>

            {/* Core Message */}
            <p className="text-base md:text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
              Deutschland hat kein Erkenntnis-, sondern ein <span className="text-white font-medium">Umsetzungsproblem</span>.
              Wir ersetzen politische Beschwörungen durch <span className="text-accent-cyan">messbare Ergebnisse</span>.
              Dieser Kreis ist der erste Schritt.
            </p>
          </section>

          {/* Form Section */}
          <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {!isSubmitted ? (
              <div className="bg-bg-secondary border border-border-subtle rounded-2xl p-8 md:p-12 shadow-lg">
                {/* Form Header */}
                <div className="text-center mb-10">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">
                    IHR BEITRAG <span className="text-accent-cyan">ZÄHLT.</span>
                  </h3>
                  <p className="text-text-muted text-sm">
                    Alle Felder mit * sind Pflichtfelder
                  </p>
                </div>

                {/* Hidden form for Netlify */}
                <form name="gruendungskreis" netlify-honeypot="bot-field" data-netlify="true" hidden>
                  <input type="text" name="vorname" />
                  <input type="text" name="nachname" />
                  <input type="email" name="email" />
                  <input type="text" name="organisation" />
                  <input type="text" name="beitrag_information" />
                  <input type="text" name="beitrag_expertise" />
                  <input type="text" name="beitrag_finanziell" />
                </form>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Honeypot */}
                  <input type="hidden" name="form-name" value="gruendungskreis" />
                  <p className="hidden">
                    <label>
                      Don't fill this out: <input name="bot-field" />
                    </label>
                  </p>

                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Vorname *
                      </label>
                      <input
                        type="text"
                        {...register('vorname', { required: 'Vorname ist erforderlich' })}
                        className={`w-full px-4 py-3 bg-bg-tertiary border rounded-lg text-white placeholder-text-muted transition-all duration-200 focus:border-accent-cyan focus:shadow-glow-cyan/20 ${
                          errors.vorname ? 'border-accent-red' : 'border-border-subtle'
                        }`}
                        placeholder="Max"
                      />
                      {errors.vorname && (
                        <p className="mt-2 text-sm text-accent-red">{errors.vorname.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Nachname *
                      </label>
                      <input
                        type="text"
                        {...register('nachname', { required: 'Nachname ist erforderlich' })}
                        className={`w-full px-4 py-3 bg-bg-tertiary border rounded-lg text-white placeholder-text-muted transition-all duration-200 focus:border-accent-cyan focus:shadow-glow-cyan/20 ${
                          errors.nachname ? 'border-accent-red' : 'border-border-subtle'
                        }`}
                        placeholder="Mustermann"
                      />
                      {errors.nachname && (
                        <p className="mt-2 text-sm text-accent-red">{errors.nachname.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      E-Mail *
                    </label>
                    <input
                      type="email"
                      {...register('email', {
                        required: 'E-Mail ist erforderlich',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Ungültige E-Mail-Adresse'
                        }
                      })}
                      className={`w-full px-4 py-3 bg-bg-tertiary border rounded-lg text-white placeholder-text-muted transition-all duration-200 focus:border-accent-cyan focus:shadow-glow-cyan/20 ${
                        errors.email ? 'border-accent-red' : 'border-border-subtle'
                      }`}
                      placeholder="max.mustermann@example.de"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-accent-red">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Organisation */}
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Unternehmen / Organisation
                    </label>
                    <input
                      type="text"
                      {...register('organisation')}
                      className="w-full px-4 py-3 bg-bg-tertiary border border-border-subtle rounded-lg text-white placeholder-text-muted transition-all duration-200 focus:border-accent-cyan focus:shadow-glow-cyan/20"
                      placeholder="Optional"
                    />
                  </div>

                  {/* Contribution Checkboxes */}
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-4">
                      Ich möchte beitragen durch: *
                    </label>
                    <div className="space-y-4">
                      <label className="flex items-start gap-4 cursor-pointer group">
                        <input
                          type="checkbox"
                          {...register('beitrag_information')}
                          className="mt-1"
                        />
                        <div>
                          <span className="text-white font-medium group-hover:text-accent-cyan transition-colors">
                            Information & Netzwerk
                          </span>
                          <p className="text-sm text-text-muted mt-1">
                            Ich möchte informiert bleiben und die Idee aktiv in meinem Netzwerk verbreiten.
                          </p>
                        </div>
                      </label>

                      <label className="flex items-start gap-4 cursor-pointer group">
                        <input
                          type="checkbox"
                          {...register('beitrag_expertise')}
                          className="mt-1"
                        />
                        <div>
                          <span className="text-white font-medium group-hover:text-accent-cyan transition-colors">
                            Expertise & Mitwirkung
                          </span>
                          <p className="text-sm text-text-muted mt-1">
                            Ich möchte meine fachliche Expertise einbringen und an der Weiterentwicklung des Konzepts mitwirken.
                          </p>
                        </div>
                      </label>

                      <label className="flex items-start gap-4 cursor-pointer group">
                        <input
                          type="checkbox"
                          {...register('beitrag_finanziell')}
                          className="mt-1"
                        />
                        <div>
                          <span className="text-white font-medium group-hover:text-accent-cyan transition-colors">
                            Finanzielle Unterstützung
                          </span>
                          <p className="text-sm text-text-muted mt-1">
                            Ich bin an Möglichkeiten interessiert, die professionelle Verbreitung der Idee finanziell zu unterstützen.
                          </p>
                        </div>
                      </label>
                    </div>
                    {!hasSelectedBeitrag && (
                      <p className="mt-3 text-sm text-text-muted">
                        Bitte wählen Sie mindestens eine Option.
                      </p>
                    )}
                  </div>

                  {/* Privacy Checkbox */}
                  <div className="pt-4 border-t border-border-subtle">
                    <label className="flex items-start gap-4 cursor-pointer group">
                      <input
                        type="checkbox"
                        {...register('datenschutz', { required: 'Bitte stimmen Sie der Datenschutzerklärung zu' })}
                        className="mt-1"
                      />
                      <div>
                        <span className={`text-sm ${errors.datenschutz ? 'text-accent-red' : 'text-text-secondary'}`}>
                          Ich stimme zu, dass meine Daten zur Kontaktaufnahme im Rahmen des Gründungskreises Befähigungsrepublik gespeichert und verarbeitet werden. *
                        </span>
                      </div>
                    </label>
                    {errors.datenschutz && (
                      <p className="mt-2 text-sm text-accent-red">{errors.datenschutz.message}</p>
                    )}
                  </div>

                  {/* Error Message */}
                  {submitError && (
                    <div className="p-4 bg-accent-red/10 border border-accent-red/30 rounded-lg">
                      <p className="text-accent-red text-sm">{submitError}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !hasSelectedBeitrag}
                    className={`w-full py-4 px-8 text-lg font-bold tracking-wide rounded-lg transition-all duration-300 ${
                      isSubmitting || !hasSelectedBeitrag
                        ? 'bg-bg-tertiary text-text-muted cursor-not-allowed'
                        : 'bg-accent-cyan text-bg-primary hover:bg-white hover:shadow-glow-cyan'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-3">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        WIRD GESENDET...
                      </span>
                    ) : (
                      'JETZT MITWIRKEN'
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* Success Message */
              <div className="bg-bg-secondary border border-accent-cyan rounded-2xl p-8 md:p-12 shadow-glow-cyan text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-accent-cyan/10 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  <span className="text-accent-cyan">VIELEN DANK!</span>
                </h3>
                <p className="text-xl text-white mb-3">
                  Sie sind dabei.
                </p>
                <p className="text-text-secondary">
                  Wir melden uns in Kürze bei Ihnen.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-20 py-12 border-t border-border-subtle">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Contact Info */}
            <div className="text-center md:text-left">
              <p className="font-mono text-sm text-text-muted mb-1">INITIATOR</p>
              <p className="text-white font-medium">Christopher Peterka</p>
              <p className="text-text-secondary">gannaca</p>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6 text-sm">
              <a
                href="mailto:peterka@gannaca.com"
                className="text-text-muted hover:text-accent-cyan transition-colors"
              >
                Kontakt
              </a>
              <span className="text-border-subtle">|</span>
              <a
                href="#impressum"
                className="text-text-muted hover:text-accent-cyan transition-colors"
              >
                Impressum
              </a>
              <span className="text-border-subtle">|</span>
              <a
                href="#datenschutz"
                className="text-text-muted hover:text-accent-cyan transition-colors"
              >
                Datenschutz
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-6 border-t border-border-subtle text-center">
            <p className="font-mono text-xs text-text-muted">
              © 2026 Befähigungsrepublik 2040 · Vom Glauben zum Gestalten
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
